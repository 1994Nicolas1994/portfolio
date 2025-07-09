export default function strapiProvider() {
    const config = useRuntimeConfig()
    const baseURL = config.public.strapiUrl.toString()
  
    return {
      getImage(src: string) {
        return {
          url: `${baseURL}${src}`
        }
      }
    }
  }
  