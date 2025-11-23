import { Controller, Get, Param, Res, NotFoundException, HttpStatus } from '@nestjs/common';
import express from 'express'; // Importe Response do express
import { LinkService } from './link/link.service';




@Controller()
export class AppController {
  constructor(
    private readonly linkService: LinkService,
  ) { }


  @Get(':shortCode')
  async redirectToUrl(
    @Param('shortCode') shortCode: string,
    @Res() rest: express.Response,

  ) {
    const link = await this.linkService.findByShortCode(shortCode);
    if (!link) {
      throw new NotFoundException(`Short Code "${shortCode}" não encontrado`);

    }
    rest.redirect(HttpStatus.FOUND, link.longUrl);
  }
}
