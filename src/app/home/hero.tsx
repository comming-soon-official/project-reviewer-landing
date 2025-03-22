'use client'
import '@/styles/hero.css'

import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import React, { useEffect } from 'react'

gsap.registerPlugin(ScrollTrigger)

const Hero: React.FC = () => {
    useEffect(() => {
        // Static values (replacing dynamic config)
        const staticTheme = 'dark'
        const staticAnimate = true
        const staticSnap = true
        const staticStart = 50
        const staticEnd = 950
        const staticScroll = true
        const staticDebug = false

        let items: HTMLElement[] = []
        let scrollerScrub: ScrollTrigger | null = null
        let dimmerScrub: ScrollTrigger | null = null
        let chromaEntry: gsap.core.Tween | null = null
        let chromaExit: gsap.core.Tween | null = null

        const update = () => {
            document.documentElement.dataset.theme = staticTheme
            document.documentElement.dataset.syncScrollbar =
                String(staticScroll)
            document.documentElement.dataset.animate = String(staticAnimate)
            document.documentElement.dataset.snap = String(staticSnap)
            document.documentElement.dataset.debug = String(staticDebug)
            document.documentElement.style.setProperty(
                '--start',
                String(staticStart)
            )
            document.documentElement.style.setProperty(
                '--hue',
                String(staticStart)
            )
            document.documentElement.style.setProperty(
                '--end',
                String(staticEnd)
            )

            if (!staticAnimate) {
                chromaEntry?.scrollTrigger?.disable(true, false)
                chromaExit?.scrollTrigger?.disable(true, false)
                dimmerScrub?.disable(true, false)
                scrollerScrub?.disable(true, false)
                gsap.set(items, { opacity: 1 })
                gsap.set(document.documentElement, { '--chroma': 0 })
            } else {
                gsap.set(items, { opacity: (i: number) => (i !== 0 ? 0.2 : 1) })
                if (dimmerScrub) dimmerScrub.enable(true, true)
                if (scrollerScrub) scrollerScrub.enable(true, true)
                if (chromaEntry?.scrollTrigger)
                    chromaEntry.scrollTrigger.enable(true, true)
                if (chromaExit?.scrollTrigger)
                    chromaExit.scrollTrigger.enable(true, true)
            }
        }

        // Fallback using GSAP if CSS custom scroll animations aren't supported
        if (
            !CSS.supports(
                '(animation-timeline: scroll()) and (animation-range: 0% 100%)'
            )
        ) {
            items = gsap.utils.toArray<HTMLElement>('ul li')

            gsap.set(items, { opacity: (i: number) => (i !== 0 ? 0.2 : 1) })

            const dimmer = gsap
                .timeline()
                .to(items.slice(1), { opacity: 1, stagger: 0.5 })
                .to(
                    items.slice(0, items.length - 1),
                    { opacity: 0.2, stagger: 0.5 },
                    0
                )

            dimmerScrub = ScrollTrigger.create({
                trigger: items[0],
                endTrigger: items[items.length - 1],
                start: 'center center',
                end: 'center center',
                animation: dimmer,
                scrub: 0.2
            })

            const scroller = gsap
                .timeline()
                .fromTo(
                    document.documentElement,
                    { '--hue': staticStart },
                    { '--hue': staticEnd, ease: 'none' }
                )

            scrollerScrub = ScrollTrigger.create({
                trigger: items[0],
                endTrigger: items[items.length - 1],
                start: 'center center',
                end: 'center center',
                animation: scroller,
                scrub: 0.2
            })

            chromaEntry = gsap.fromTo(
                document.documentElement,
                { '--chroma': 0 },
                {
                    '--chroma': 0.3,
                    ease: 'none',
                    scrollTrigger: {
                        scrub: 0.2,
                        trigger: items[0],
                        start: 'center center+=40',
                        end: 'center center'
                    }
                }
            )
            chromaExit = gsap.fromTo(
                document.documentElement,
                { '--chroma': 0.3 },
                {
                    '--chroma': 0,
                    ease: 'none',
                    scrollTrigger: {
                        scrub: 0.2,
                        trigger: items[items.length - 2],
                        start: 'center center',
                        end: 'center center-=40'
                    }
                }
            )
        }
        update()
    }, [])

    return (
        <>
            <header>
                <h1 className="fluid">
                    you can
                    <br />
                    scroll.
                </h1>
            </header>
            <main>
                <section className="content fluid">
                    <h2>
                        <span aria-hidden="true">you can&nbsp;</span>
                        <span className="sr-only">you can ship things.</span>
                    </h2>
                    <ul
                        aria-hidden="true"
                        style={{ '--count': 22 } as React.CSSProperties}
                    >
                        {[
                            'design.',
                            'prototype.',
                            'solve.',
                            'build.',
                            'develop.',
                            'debug.',
                            'learn.',
                            'cook.',
                            'ship.',
                            'prompt.',
                            'collaborate.',
                            'create.',
                            'inspire.',
                            'follow.',
                            'innovate.',
                            'test.',
                            'optimize.',
                            'teach.',
                            'visualize.',
                            'transform.',
                            'scale.',
                            'do it.'
                        ].map((text, i) => (
                            <li
                                key={i}
                                style={{ '--i': i } as React.CSSProperties}
                            >
                                {text}
                            </li>
                        ))}
                    </ul>
                </section>
                <section>
                    <h2 className="fluid">fin.</h2>
                </section>
            </main>
            <footer>ʕ⊙ᴥ⊙ʔ jh3yy &copy; 2024</footer>
            <a
                className="bear-link"
                href="https://twitter.com/intent/follow?screen_name=jh3yy"
                target="_blank"
                rel="noreferrer noopener"
            >
                <svg
                    className="w-9"
                    viewBox="0 0 969 955"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <circle
                        cx="161.191"
                        cy="320.191"
                        r="133.191"
                        stroke="currentColor"
                        strokeWidth="20"
                    ></circle>
                    <circle
                        cx="806.809"
                        cy="320.191"
                        r="133.191"
                        stroke="currentColor"
                        strokeWidth="20"
                    ></circle>
                    <circle
                        cx="695.019"
                        cy="587.733"
                        r="31.4016"
                        fill="currentColor"
                    ></circle>
                    <circle
                        cx="272.981"
                        cy="587.733"
                        r="31.4016"
                        fill="currentColor"
                    ></circle>
                    <path
                        d="M564.388 712.083C564.388 743.994 526.035 779.911 483.372 779.911C440.709 779.911 402.356 743.994 402.356 712.083C402.356 680.173 440.709 664.353 483.372 664.353C526.035 664.353 564.388 680.173 564.388 712.083Z"
                        fill="currentColor"
                    ></path>
                    <rect
                        x="310.42"
                        y="448.31"
                        width="343.468"
                        height="51.4986"
                        fill="#FF1E1E"
                    ></rect>
                    <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M745.643 288.24C815.368 344.185 854.539 432.623 854.539 511.741H614.938V454.652C614.938 433.113 597.477 415.652 575.938 415.652H388.37C366.831 415.652 349.37 433.113 349.37 454.652V511.741L110.949 511.741C110.949 432.623 150.12 344.185 219.845 288.24C289.57 232.295 384.138 200.865 482.744 200.865C581.35 200.865 675.918 232.295 745.643 288.24Z"
                        fill="currentColor"
                    ></path>
                </svg>
            </a>
        </>
    )
}

export default Hero
