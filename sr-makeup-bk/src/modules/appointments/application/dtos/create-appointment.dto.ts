import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateAppointmentDto {
  @IsString()
  @IsNotEmpty({ message: 'El nombre del cliente es obligatorio' })
  clientName: string;

  @IsEmail({}, { message: 'El correo electrónico no es válido' })
  clientEmail: string;

  @IsString()
  @IsNotEmpty({ message: 'El teléfono es obligatorio' })
  clientPhone: string;

  @IsString()
  @IsNotEmpty({ message: 'El servicio es obligatorio' })
  serviceId: string;

  @IsString()
  @IsNotEmpty({ message: 'La fecha es obligatoria (formato YYYY-MM-DD)' })
  date: string;

  @IsString()
  @IsNotEmpty({ message: 'La hora es obligatoria' })
  time: string;

  @IsString()
  @IsOptional()
  notes?: string;
}

