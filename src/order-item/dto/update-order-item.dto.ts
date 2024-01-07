import { CreateOrderItemDto } from "./create-order-item.dto";
import { PartialType } from "@nestjs/mapped-types"

export class UpdateOrderItemDto extends PartialType(CreateOrderItemDto) {}