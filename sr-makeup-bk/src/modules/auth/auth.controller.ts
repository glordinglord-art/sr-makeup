import {
  Body,
  Controller,
  Post,
  UnauthorizedException,
} from '@nestjs/common';
import { IsString, MinLength } from 'class-validator';
import { createHmac, timingSafeEqual } from 'crypto';

export class VerifyPinDto {
  @IsString()
  @MinLength(4)
  pin: string;
}

@Controller('auth')
export class AuthController {
  @Post('verify-pin')
  verifyPin(@Body() dto: VerifyPinDto) {
    const expectedPin = process.env.ADMIN_ACCESS_PIN || '9966';
    const provided = Buffer.from(dto.pin.trim());
    const expected = Buffer.from(expectedPin.trim());

    const isMatch =
      provided.length === expected.length && timingSafeEqual(provided, expected);

    if (!isMatch) {
      throw new UnauthorizedException(
        'Código de acceso incorrecto. Intenta nuevamente.',
      );
    }

    const secret = process.env.SUPABASE_JWT_SECRET || 'sr-makeup-admin-secret';
    const payload = JSON.stringify({
      role: 'ADMIN',
      name: 'Shirley Ram',
      iat: Date.now(),
    });
    const token = createHmac('sha256', secret).update(payload).digest('hex');

    return {
      ok: true,
      token,
      user: {
        name: 'Shirley Ram',
        role: 'ADMIN',
      },
    };
  }
}
