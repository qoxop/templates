import Mail from "@/container/mail"
import { accounts, mails } from "@/components/data"

function App() {

  return (
    <div className="hidden flex-col md:flex">
      <Mail
        accounts={accounts}
        mails={mails}
        defaultLayout={undefined}
        defaultCollapsed={undefined}
        navCollapsedSize={4}
      />
    </div>
  )
}


export default App
