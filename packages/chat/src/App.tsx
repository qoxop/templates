import Mail from "@/container/mail"
import { accounts, mails } from "@/components/data"

function App() {

  return (
    <Mail
      accounts={accounts}
      mails={mails}
      defaultLayout={undefined}
      defaultCollapsed={undefined}
      navCollapsedSize={4}
    />
  )
}


export default App
