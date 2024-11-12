

export default function FileLink({ href, name }) {
    return <a className="text-indigo-600" href={href} download>{name}</a>
}