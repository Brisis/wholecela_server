import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { LocationModule } from './location/location.module';
import { CategoryModule } from './category/category.module';
import { ProductModule } from './product/product.module';
import { CartModule } from './cart/cart.module';
import { CartItemModule } from './cart-item/cart-item.module';
import { OrderModule } from './order/order.module';
import { OrderItemModule } from './order-item/order-item.module';
import { ColorService } from './color/color.service';
import { ColorModule } from './color/color.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    }),
    AuthModule, 
    UserModule, 
    PrismaModule, 
    LocationModule, 
    CategoryModule, 
    ProductModule, 
    CartModule, 
    CartItemModule, 
    OrderModule, 
    OrderItemModule, 
    ColorModule,
  ],
  controllers: [],
})
export class AppModule {}
