import { createClient } from 'next-sanity'

import { apiVersion, dataset, projectId } from '../env'

export const client = createClient({
  projectId:"ibh3ozqb",
  dataset:"production",
  useCdn: true, // Set to false if statically generating pages, using ISR or tag-based revalidation
  token:"skp06snqoX7ArmCciTp0t2iDIfQOqVrUoFaQJNZtV8KAg0GKhw3lMAiCh1hV7tlguQX2XtXyWYfu0v7hmYichtjvJuyW73woDvl56rfOjA7cWrz9twlWFRPg3KCP5GsQrqUjkjWmP2Lbeho0g75dKmryLvIwTK9D8wNXmVY6LleuA0xit4cs"
})
