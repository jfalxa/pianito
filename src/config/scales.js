import { steps } from '../utils/helpers'

export const MAJOR = [1, 1, 1 / 2, 1, 1, 1, 1 / 2]
export const MINOR = [1, 1 / 2, 1, 1, 1 / 2, 1, 1]

export const MAJOR_STEPS = steps(MAJOR)
export const MINOR_STEPS = steps(MINOR)
