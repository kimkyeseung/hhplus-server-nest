export class CreateConcertDto {
  title: string;
  location: string;
  artistId: number;
  dates: Date[];
  price: number;
}
