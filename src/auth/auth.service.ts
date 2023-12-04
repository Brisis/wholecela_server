import { ForbiddenException, Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { AuthDto } from "./dto";
import * as argon from "argon2"
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { JwtService } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class AuthService {
    constructor(
        private prisma: PrismaService, 
        private jwt: JwtService,
        private config: ConfigService
    ) {}

    async signup(dto: AuthDto) {
        const hash = await argon.hash(dto.password)
        
        try {
            const role = "customer"
            const user = await this.prisma.user.create({
                data: {
                    name: dto.name,
                    role: role,
                    email: dto.email,
                    hashedPassword: hash
                },
                select: {
                    id: true,
                    email: true,
                    createdAt: true
                }
            })

            return this.signToken(user.id, user.email)
        } catch (error) {
            if (error instanceof PrismaClientKnownRequestError) {
                if (error.code == "P2002") {
                    throw new ForbiddenException("Credentials taken")
                }
            }

            throw error
        }
    }

    async signin(dto: AuthDto) {
        const user = await this.prisma.user.findUnique({
            where: {
                email: dto.email
            }
        })

        if (!user) {
            throw new ForbiddenException("Credentials incorrect")
        }

        const pwdMatches = await argon.verify(user.hashedPassword, dto.password)

        if (!pwdMatches) {
            throw new ForbiddenException("Credentials incorrect")
        }

        return this.signToken(user.id, user.email)
    }

    async signToken(userId: string, email: string): Promise<{access_token: string}> {
        const payload = {
            sub: userId,
            email: email
        }

        const secret = this.config.get("JWT_SECRET")

        const token = await this.jwt.signAsync(payload, {
            expiresIn: "30d",
            secret: secret
        })

        return {
            access_token: token
        }
    }
}