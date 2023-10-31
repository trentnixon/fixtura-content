import { P } from "@/components/Type/Paragraph"
import { FixturaPaper } from "@/components/containers/paper"

export const VideoError=()=>{
    return(
      <FixturaPaper c={4}>
        <P ta={'center'} c='red.9' fw={600}>There was an Error when creating your video.</P>
        <P ta={'center'} c='red.9'>Please contact us to re-render this asset</P>
      </FixturaPaper>
    )
  }