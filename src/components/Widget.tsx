import { ChatTeardropText } from "phosphor-react";
import { Popover } from '@headlessui/react'
import {WidgetForm} from "./WidgetForm";

export default function Widget() {

  return (
    <Popover className="fixed bottom-8 right-8 md:bottom-5 md:right-5 flex flex-col items-end">
      <Popover.Panel><WidgetForm/></Popover.Panel>
      <Popover.Button onClick={()=> null} className="bg-brand-500 rounded-full px-3 h-12 text-white flex items-center group">
        <ChatTeardropText className="w-6 h-6" />
        <span className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-500 ease-linear">
            <span className="pl-2"></span>
            Feedback
        </span>
      </Popover.Button>
    </Popover>
  );
}
