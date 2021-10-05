import PageNotFound from "components/Error/errorPage"
import { FC } from "react"

interface ErrorPageProps {
  message?: string
}

const ErrorPage:FC<ErrorPageProps> = ({message}) => {
return <PageNotFound message={message} />
}

export default ErrorPage