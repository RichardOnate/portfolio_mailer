import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { ConfigService } from '@nestjs/config';

@Injectable()
export class ApiKeyGuard implements CanActivate {
  constructor(private readonly config: ConfigService) {}

  canActivate(context: ExecutionContext): boolean {
    const secretKey = this.config.get('API_KEY'); 
    const request = context.switchToHttp().getRequest();
    const apiKey = request.headers.authorization; 

    if (!apiKey) {
      throw new UnauthorizedException('API key is missing');  
    }

    const token = apiKey.split('Bearer ')[1];  
    
    if (!token || token !== secretKey) {
      throw new UnauthorizedException('Invalid API key');  
    }

    return true; 
  }
}
