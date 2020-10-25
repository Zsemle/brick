export type ExperienceCategory = 'animals'| 'sports' | 'brain games'
interface Price {
    amount: number
    currency: string
}

export interface Experience {
    name: string
    description: string
    category: ExperienceCategory
    price: Price
}
