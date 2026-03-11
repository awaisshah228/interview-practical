export default function ImageBlock({ src, alt = "Image", caption }: { src?: string; alt?: string; caption?: string }) {
    return (
        <div className="image-block">
            {src ? (
                <img src={src} alt={alt} loading="lazy" />
            ) : (
                <div className="image-placeholder">
                    <span className="placeholder-icon">&#128247;</span>
                    <span>{alt}</span>
                </div>
            )}
            {caption && <div className="image-caption">{caption}</div>}
        </div>
    );
}
