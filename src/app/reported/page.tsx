import { JSX } from 'react'
import Spinner from '../../components/Spinner'
import Wordmark from '../../components/Wordmark'
import TitleText from '../../components/TitleText'
import ReturnHome from '../../components/ReturnHome'

export default function ReportedPage(): JSX.Element {
  return (
    <div className="flex flex-col items-center space-y-5 py-10 max-w-md mx-auto">
      <Spinner direction="down" />
      <Wordmark />

      <TitleText>这次投递被暂停了。</TitleText>
      <div className="px-8 py-6 bg-stone-100 dark:bg-stone-800 rounded-lg border border-stone-200 dark:border-stone-700">
        <h3 className="text-lg font-medium text-stone-800 dark:text-stone-200 mb-4">
          官方提醒
        </h3>
        <p className="text-sm text-stone-600 dark:text-stone-300 leading-relaxed mb-6">
          很抱歉，由于有人举报了这次投递，我们必须暂停，有可能违反了我们的服务条款，我们正在调查这个问题，以确保传送内容合法无害，给你带来不便请谅解。
        </p>
        <div className="text-sm text-stone-500 dark:text-stone-400 italic">
          - FileSou 团队
        </div>
      </div>

      <ReturnHome />
    </div>
  )
}
