const apiImage = import.meta.env.VITE_API_IMAGE

export function Image({ image, title }) {
    return (
        <img
            src={apiImage + image}
            alt={title}
        />
    )
}