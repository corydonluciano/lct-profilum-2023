import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CommunityService } from './community.service';
import { CreateCardDto } from './dto/create-card.dto';
import { UpdateCardDto } from './dto/update-card.dto';

@Controller('community')
export class CommunityController {
  constructor(private readonly communityService: CommunityService) {}

  @Post('card')
  create(@Body() createCardDto: CreateCardDto) {
    return this.communityService.createCard(createCardDto);
  }

  @Get('card')
  findAll() {
    return this.communityService.findAllCards();
  }

  @Get('card/:id')
  findOne(@Param('id') id: string) {
    return this.communityService.findOneCard(+id);
  }

  @Patch('card/:id')
  update(@Param('id') id: string, @Body() updateCommunityDto: UpdateCardDto) {
    return this.communityService.updateCard(+id, updateCommunityDto);
  }

  @Delete('card/:id')
  remove(@Param('id') id: string) {
    return this.communityService.removeCard(+id);
  }
}
