import { Controller, Post, Body, Get, Param, Res, NotFoundException, HttpStatus } from '@nestjs/common';
import { LinkService } from './link.service';
import { Response } from 'express';

class CreateLinkDto {
  longUrl: string;
}


@Controller('link')
export class LinkController {
  constructor(private readonly linkService: LinkService) { }

  @Post()
  async create(@Body() createLinkDto: CreateLinkDto) {
    if (!createLinkDto.longUrl) {
      return { error: 'longUrl é obrigatório' };
    }
    const link = await this.linkService.shortenUrl(createLinkDto);
    return { shortCode: link.shortCode, longUrl: link.longUrl };
  }
}
