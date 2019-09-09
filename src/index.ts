import { join } from 'lodash'

class Food {
  species: string
  flavor: string
  constructor (species: string) {
    this.species = species
    if (['hog', 'cattle'].includes(this.species)) {
      this.flavor = 'meat'
    } else if (['spinach', 'lettuce'].includes(this.species)) {
      this.flavor = 'vegetable'
    }
  }
  getFlavor (): string | undefined {
    return this.flavor
  }
}

let cattle = new Food('cattle')
let cattleFlavor = cattle.getFlavor()
console.log(join([cattle.species, cattleFlavor], ' is '))

let spinach = new Food('spinach')
let spinachFlavor = spinach.getFlavor()
console.log(join([spinach.species, spinachFlavor], ' is '))