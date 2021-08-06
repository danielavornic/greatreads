import { Grid } from '@chakra-ui/react';

import GenreItem from './genre-item';

import { ReactComponent as RomanceGenre } from '../assets/genre-icons/romance.svg';
import { ReactComponent as ArtGenre } from '../assets/genre-icons/art.svg';
import { ReactComponent as HistoryGenre } from '../assets/genre-icons/history.svg';
import { ReactComponent as FantasyGenre } from '../assets/genre-icons/fantasy.svg';
import { ReactComponent as DetectiveGenre } from '../assets/genre-icons/detective.svg';
import { ReactComponent as More } from '../assets/genre-icons/more.svg';

const GenreListPreview = () => (
  <Grid 
    templateColumns={['repeat(2, 1fr)', 'repeat(2, 1fr)', 'repeat(3, 1fr)', 'repeat(6, 1fr)']}
    gap={[4, 4, 6, 6]} 
    w={'full'}
  >
    <GenreItem name='Romance' icon={<RomanceGenre height='56px'/>} />
    <GenreItem name='Art' icon={<ArtGenre height='56px'/>} />
    <GenreItem name='History' icon={<HistoryGenre height='56px'/>} />
    <GenreItem name='Fantasy' icon={<FantasyGenre height='56px'/>} />
    <GenreItem name='Detective' icon={<DetectiveGenre height='56px'/>} />
    <GenreItem name='More' icon={<More height='56px'/>} />
  </Grid>
);

export default GenreListPreview;