import { pathToRoot } from "../util/path"
import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"

// deep-ocean banner from the main site, shown on the notes home page only
export default (() => {
  const Masthead: QuartzComponent = ({ fileData }: QuartzComponentProps) => {
    if (fileData.slug !== "index") return null
    const root = pathToRoot(fileData.slug!)
    return (
      <header class="site-masthead" style={`background-image:url(${root}/static/deep-ocean.jpg)`}>
        <h1>Notes</h1>
        <span>Robotics · Control · Machine Learning · Math</span>
      </header>
    )
  }
  return Masthead
}) satisfies QuartzComponentConstructor
