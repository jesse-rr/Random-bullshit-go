
export interface IconType {
    src: string | import('@fortawesome/fontawesome-svg-core').IconDefinition,
    alt: string,
    className: string,
    label?: string,
    route?: string,
    onClick?: () => void
}