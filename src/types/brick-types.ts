export type ExperienceCategory = 'animals'| 'sports' | 'brain games'

interface IPrice {
    amount: number
    currency: string
}

export class Price {
    amount: number
    currency: string

    constructor ({ amount, currency }:IPrice) {
      this.amount = amount
      this.currency = currency
    }
}

interface IExperience {
    name: string
    description: string
    category: ExperienceCategory
    price: Price
}

export class Experience {
    name: string
    description: string
    category: ExperienceCategory
    price: Price

    constructor ({ name, description, category, price }:IExperience) {
      this.name = name
      this.description = description
      this.category = category
      this.price = price
    }
}
