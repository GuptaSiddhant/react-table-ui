export const commonClassName = 'RTUI'

type FalsyValue = undefined | null | false | 0 | ''
type ClassName = string | FalsyValue | ClassName[] | Record<string, boolean>

export default function clsx(...classNames: ClassName[]): string {
  return classNames
    .map((name) => {
      if (!name) return null
      if (typeof name !== 'object') return name
      if (Array.isArray(name)) return clsx(name)
      return Object.entries(name)
        .filter(([, v]) => Boolean(v))
        .map(([k]) => k)
        .join(' ')
    })
    .filter(Boolean)
    .join(' ')
}
