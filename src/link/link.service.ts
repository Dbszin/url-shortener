import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm/dist/common/typeorm.decorators';
import { Repository } from 'typeorm';
import { Link } from './entities/link.entity';
import * as crypto from 'crypto';

interface CreateLinkDto {
  longUrl: string;
}


@Injectable()
export class LinkService {
  constructor(
    @InjectRepository(Link)
    private linksRepository: Repository<Link>,
  ) { }

  private generateShortCode(Length: number = 6): string {


    return crypto.randomBytes(Math.ceil(Length / 2))
      .toString('hex')
      .slice(0, Length);
  }

  async shortenUrl(CreateLinkDtop: CreateLinkDto): Promise<Link> {
    const { longUrl } = CreateLinkDtop;
    let shortCode = this.generateShortCode();
    let existingLink = await this.linksRepository.findOne({ where: { shortCode } });
    while (existingLink) {
      shortCode = this.generateShortCode();
      existingLink = await this.linksRepository.findOne({ where: { shortCode } });
    }
    const newLink = this.linksRepository.create({
      longUrl,
      shortCode,

    });
    return this.linksRepository.save(newLink);
  }


  async findByShortCode(shortCode: string): Promise<Link | null> {
    const link = await this.linksRepository.findOne({ where: { shortCode } });

    if (link) {
      link.hits += 1;
      await this.linksRepository.save(link);

    }

    return link;
  }
}