'use client'

import Link from "next/link"

const LoadButton = ({page, value}) => {
    return <Link href={"/?page="+page}>{value == "inc" ? "Next" : "Previous"}</Link>
}
export default LoadButton