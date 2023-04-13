import React from 'react'

const data = [
    {
        type: "Summarize Button",
        info: "Will summarize your current active page",
        how: "When clicked it will create a summary below the content of your page."
    },
    {
        type: "Story (Fictional)",
        info: "Will create a story on the page based on the topic you choose.",
        how: "When you click it will open a prompt window where you can give it a topic. It will then create a story based on the topic."
    },
    {
        type: "Button: Improve Me",
        info: "Will attempt to make your page sound better",
        how: "Click this and it will parse through the content on your page and return a better page."
    },
    {
        type: "I'm A Idiot",
        info: "Will try to summarize your page and explain things as if you were a child.",
        how: "Click this and it will parse through the content on your page and return content in leymans terms."
    },
    {
        type: "Code For Me",
        info: "Will create code based on your pages content",
        how: "Ideally the content on your page should give it specific instructions on what kind of code you want otherwise it can bug out. It parses through your content and determines what code to send back."
    },
    {
        type: "Outline"
    }
]



export default function FAQ() {
  return (
    <div>FAQ</div>
  )
}
