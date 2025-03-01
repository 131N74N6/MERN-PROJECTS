import "../Styles/ErrorPage.css";

export default function ErrorPage({ text }) {
    return (
        <div className="error-page">
            <div>{text}</div>
        </div>
    )
}
