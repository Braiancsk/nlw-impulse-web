import CloseButton from "../../CloseButton";
import { FeedbackType, feedbackTypes } from "..";
import { ArrowLeft } from "phosphor-react";
import ScreenShotButton from "../ScreenShotButton";
import { FormEvent, useState } from "react";
import { api } from "../../../services/api";
import Loading from "../../Loading";

type FeedbackContentStepProps = {
  feedbackType: FeedbackType
  onFeedbackRestartRequested: () => void
  onFeedbackSent: () => void
}
export function FeedbackContentStep({feedbackType,onFeedbackRestartRequested,onFeedbackSent}: FeedbackContentStepProps) {
  const feedbackTypeInfo = feedbackTypes[feedbackType]
  const [screenshot, setScreenshot] = useState<string | null>(null)
  const [comment, setComment] = useState('')
  const [isSendingFeedback, setIsSendingFeedback] = useState(false)
  
  const handleSubmitFeedback = async (e:FormEvent) => {
    e.preventDefault()
    setIsSendingFeedback(true)
    try{
      await api.post('/feedbacks',{
        type: feedbackType,
        comment,
        screenshot,
      })


      setIsSendingFeedback(false)
      onFeedbackSent()
    }catch(err){
      setIsSendingFeedback(false)
      console.log(err)
    }
 

  }
  
  return (
    <>
      <header>
        <button onClick={onFeedbackRestartRequested} type="button" className="top-5 left-5 absolute text-zinc-400 hover:text-zinc-100 transition-colors">
          <ArrowLeft weight="bold" className="w-4 h-4"/>
        </button>
        <span className="text-xl leading-6 flex items-center gap-2">
          <img className="w-6 h-6" src={feedbackTypeInfo.image.src} alt={feedbackTypeInfo.image.alt} />
          {feedbackTypeInfo.title}
        </span>
        <CloseButton />
      </header>
      <form className="my-4 w-full" onSubmit={handleSubmitFeedback}>
      <textarea 
      onChange={(e) => setComment(e.target.value)}
      className="min-w-[304px] w-full min-h-[112px] scrollbar-thumb-zinc-700 scrollbar-track-transparent scrollbar-thin text-sm placeholder:text-zinc-400 text-zinc-100 border border-zinc-600 bg-transparent rounded-md focus:border-brand-500 focus:ring-brand-500 focus:outline-none focus:ring-1 resize-none"
      placeholder="Conte com detalhes o que está acontecendo..."
      />

      <footer className="flex gap-2 mt-2">
        <ScreenShotButton
        screenshot={screenshot}
        onScreenshotTaken={setScreenshot}
        />
        
        <button
        disabled={comment.length === 0 || isSendingFeedback}
        type="submit"
        className="p-2 bg-brand-500 rounded-md border-transparent flex-1 flex justify-center items-center text-sm hover:bg-brand-300 transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-zinc-900 focus:ring-brand-500 disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-brand-500"
        >
          {isSendingFeedback ? <Loading/> : 'Enviar Feedback'}
        </button>
      </footer>
      </form>
    </>
  );
}
