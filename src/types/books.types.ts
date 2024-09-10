export const bookCategories = ['all', 'art', 'biography', 'computers', 'history', 'medical', 'poetry'] as const

export const bookOrderBy = ['relevance', 'newest'] as const

export type BookOrderBy = typeof bookOrderBy[number]
export type BookCategory = typeof bookCategories[number]

export interface ImageLink {
    smallThumbnail: string
    thumbnail: string
}

export interface ImageLinkOne extends ImageLink {
    large: string
    medium: string
}

export type BookResponseOne = {
    volumeInfo: Book
    id: string
}

export interface BookResponse {
    totalItems: number
    items: BookResponseOne[]
}

export interface BookResponseFullBook { 
    volumeInfo: BookOne
    id: string
}

export class Book {
    constructor(
        public id: string,
        public title: string,
        public subtitle: string,
        public description: string,
        public authors: string[],
        public categories: string[],
        public imageLinks: ImageLink | null,
        public language: string,
        public pageCount: number,
        public publisher: string,
    ) {}
}

export class BookOne {
    constructor(
        public id: string,
        public title: string,
        public subtitle: string,
        public description: string,
        public authors: string[],
        public categories: string[],
        public imageLinks: ImageLinkOne | null,
        public language: string,
        public pageCount: number,
        public publisher: string,
    ) {}
}

export class BookSearchParams {
    page: number = 0
    pageSize: number = 30
    orderBy: BookOrderBy = 'relevance'
    category: BookCategory = 'all'
    search: string = "harry"
}

export type LoadBooksParams = {
    setEmptyList?: boolean
    params: BookSearchParams
}