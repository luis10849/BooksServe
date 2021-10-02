export class CreateReviewDto {
  readonly comment: string;
  readonly calification: number;
  readonly userId: number;
  readonly bookId: number;
}
