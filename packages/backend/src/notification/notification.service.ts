import { Injectable, Logger } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom, Observable, take } from 'rxjs';
import { stringify } from 'qs';

@Injectable()
export class NotificationService {
  constructor(private httpService: HttpService) {}
  private readonly logger = new Logger(NotificationService.name);

  async sendSms({
    from,
    to,
    message,
  }: {
    from: string;
    to: string;
    message: string;
  }): Promise<Observable<unknown>> {
    const source$ = this.httpService
      .post<{
        token_type: string;
        access_token: string;
        expires_in: number;
      }>(
        'https://api.orange.com/oauth/v3/token',
        stringify({
          grant_type: 'client_credentials',
        }),
        {
          headers: {
            Authorization:
              'Basic OHBpR3psNXBLNWYxR0JueWpHUDJnRGt6UUZaSlNOQVQ6bE43N2VCZFJpdlMxcDBIaA==',
          },
        },
      )
      .pipe(take(1));

    const response = await lastValueFrom(source$);
    const accessToken = response.data?.access_token;
    const tokenType = response.data?.token_type;

    return this.httpService.post(
      `https://api.orange.com/smsmessaging/v1/outbound/tel%3A${from}/requests`,
      {
        outboundSMSMessageRequest: {
          address: `tel:${to}`,
          senderAddress: `tel:${from}`,
          outboundSMSTextMessage: {
            message,
          },
        },
      },
      {
        headers: {
          Authorization: `${tokenType} ${accessToken}`,
        },
      },
    );
  }
}
