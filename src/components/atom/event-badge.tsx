'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface EventBadgeProps {
  date: string;
  day: string;
  label?: string;
  moreText?: string;
  href?: string;
  className?: string;
}

// SVG Components matching reference site exactly
const BubbleSVG = () => (
  <svg viewBox="0 0 87 34" fill="none" className="w-full h-full">
    <path d="m.423828.423828h86v23h-86z" fill="currentColor" />
    <path d="m45.7432 33.4238-12.3194-12h13z" fill="currentColor" />
  </svg>
);

const NextOCSVG = () => (
  <svg viewBox="0 0 87 34" fill="none" className="w-full h-full">
    <path
      d="m9.7268 5.50683h2.737l6.239 8.32997-.816.272v-8.60197h2.873v11.91697h-2.72l-6.239-8.29597.833-.272v8.56797h-2.907zm19.1273 6.52797c.0113-.374-.0567-.6913-.204-.952-.136-.272-.3344-.4816-.595-.629-.2607-.1473-.561-.221-.901-.221-.3967 0-.7367.1077-1.02.323-.272.204-.4874.493-.646.867-.1474.3627-.221.7877-.221 1.275 0 .5327.0906.9917.272 1.377.1813.3854.4363.6857.765.901.34.204.731.306 1.173.306.816 0 1.5356-.3116 2.159-.935l1.581 1.564c-.4647.51-1.037.9067-1.717 1.19-.6687.2834-1.4337.425-2.295.425-.9974 0-1.8644-.1926-2.601-.578-.7254-.3853-1.2864-.9293-1.683-1.632-.3854-.7026-.578-1.5186-.578-2.448 0-.952.1983-1.7793.595-2.482.3966-.71397.9576-1.26364 1.683-1.64897.7253-.39667 1.564-.595 2.516-.595 1.0766 0 1.9663.22666 2.669.68.714.442 1.2353 1.07666 1.564 1.90397.34.8274.476 1.7964.408 2.907h-6.936v-1.598zm3.0645-3.79097h3.468l1.479 2.60097 1.598-2.60097h3.315l-2.907 4.47097 3.111 4.709h-3.485l-1.632-2.822-1.819 2.822h-3.332l3.128-4.709zm14.7276 5.91597c0 .3514.0736.6064.221.765.1473.1587.3513.2324.612.221.1586 0 .3343-.0283.527-.085.1926-.0566.3966-.1303.612-.221l.578 2.091c-.3287.204-.714.3627-1.156.476-.4307.102-.8727.153-1.326.153-.5894 0-1.1164-.1076-1.581-.323-.4647-.2266-.833-.5553-1.105-.986-.2607-.442-.391-.9803-.391-1.615v-8.49997h3.009zm-4.284-5.49097h6.664v1.97197h-6.664zm18.5309-3.349c.9293 0 1.7793.153 2.55.459.782.306 1.462.73666 2.04 1.292.5893.55533 1.0426 1.207 1.36 1.955.3286.73666.493 1.54137.493 2.41397 0 .884-.1644 1.7057-.493 2.465-.3174.748-.7707 1.4054-1.36 1.972-.578.5554-1.258.9917-2.04 1.309-.7707.306-1.6207.459-2.55.459-.918 0-1.768-.153-2.55-.459-.782-.3173-1.4677-.7536-2.057-1.309-.578-.5666-1.0314-1.224-1.36-1.972-.3174-.7593-.476-1.581-.476-2.465 0-.8726.1586-1.68297.476-2.43097.3286-.748.782-1.394 1.36-1.938.5893-.55534 1.275-.986 2.057-1.292s1.632-.459 2.55-.459zm.034 2.601c-.442 0-.867.09066-1.275.272-.3967.17-.748.41933-1.054.748-.2947.31733-.527.69133-.697 1.12197-.17.4194-.255.884-.255 1.394 0 .4987.085.969.255 1.411.17.4307.408.8104.714 1.139.306.3174.6573.5667 1.054.748.3966.1814.816.272 1.258.272s.8556-.0906 1.241-.272c.3966-.1813.7423-.4306 1.037-.748.2946-.3286.5213-.7083.68-1.139.17-.442.255-.9123.255-1.411 0-.51-.085-.9746-.255-1.394-.1587-.43064-.3854-.80464-.68-1.12197-.2947-.32867-.6404-.578-1.037-.748-.3854-.18134-.799-.272-1.241-.272zm16.3542 1.581c-.3853-.48734-.8443-.87267-1.377-1.156-.5326-.28334-1.0596-.425-1.581-.425-.4533 0-.8783.09066-1.275.272-.3966.17-.7423.41366-1.037.731-.2946.306-.5213.67433-.68 1.10497-.1586.4194-.238.8784-.238 1.377 0 .4987.0794.9634.238 1.394.1587.4194.3854.7877.68 1.105.2947.3174.6404.5667 1.037.748.3967.17.8217.255 1.275.255.4987 0 1.0087-.1246 1.53-.374.5327-.2606 1.0087-.6063 1.428-1.037l1.819 1.921c-.4306.4534-.918.85-1.462 1.19-.544.3287-1.1163.5837-1.717.765-.5893.1814-1.1786.272-1.768.272-.8953 0-1.7226-.153-2.482-.459-.7593-.3173-1.4223-.7536-1.989-1.309-.5553-.5666-.9916-1.224-1.309-1.972-.3173-.7593-.476-1.581-.476-2.465 0-.8726.1587-1.67731.476-2.41397.3174-.748.765-1.39967 1.343-1.955.578-.55534 1.2524-.986 2.023-1.292.782-.306 1.6264-.459 2.533-.459.5894 0 1.1787.085 1.768.255.5894.15866 1.1447.391 1.666.697.5214.306.9804.66866 1.377 1.088z"
      fill="currentColor"
    />
  </svg>
);

const PartsSVG = () => (
  <svg viewBox="0 0 87 94" fill="none" className="w-full h-full">
    <path
      d="M56.77 81.4273C66.2058 86.7664 76.0881 90.6106 86.1257 93.057L0 0C5.45567 33.1223 25.298 63.6041 56.7894 81.4273H56.77Z"
      fill="currentColor"
    />
  </svg>
);

const SaturdaySVG = () => (
  <svg viewBox="0 0 30 30" fill="none" className="w-full h-full">
    <path
      clipRule="evenodd"
      d="m15 30c8.2843 0 15-6.7157 15-15 0-8.28427-6.7157-15-15-15-8.28427 0-15 6.71573-15 15 0 8.2843 6.71573 15 15 15zm1.3859-10.6019v-5.688h5.688v-2.628h-5.688v-4.86005c.396-.072.558-.198.576-.414l-3.402-.18v5.45405h-5.59804v2.628h5.59804v5.688h-6.80404v2.628h16.52404v-2.628z"
      fill="currentColor"
      fillRule="evenodd"
    />
  </svg>
);

const ExternalLinkSVG = () => (
  <svg viewBox="0 0 24 24" fill="none" className="w-full h-full">
    <path
      d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14L21 3"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export function EventBadge({
  date = '02.21',
  day = 'SAT',
  label = 'قريباً',
  moreText = 'MORE',
  href,
  className,
}: EventBadgeProps) {
  const Wrapper = href ? motion.a : motion.div;

  return (
    <Wrapper
      href={href}
      target={href ? '_blank' : undefined}
      className={cn(
        'group relative w-36 h-36 md:w-44 md:h-44 lg:w-52 lg:h-52',
        'flex flex-col items-center justify-center',
        'rounded-full cursor-pointer',
        'filter drop-shadow-xl',
        className
      )}
      whileHover="hover"
      initial="initial"
    >
      {/* Background Circle with Clip-path Animation */}
      <motion.span
        className="absolute inset-0 z-[1]"
        style={{
          rotate: '29.2deg',
          clipPath: 'inset(8.2% 0 0 0)',
        }}
        variants={{
          initial: { clipPath: 'inset(8.2% 0 0 0)' },
          hover: { clipPath: 'inset(0% 0 0 0)' },
        }}
        transition={{ duration: 0.3, ease: [0.39, 0.58, 0.57, 1] }}
      >
        <span className="block w-full h-full rounded-full bg-yellow-400" />
      </motion.span>

      {/* White Triangle Parts - Top Right */}
      <motion.span
        className="absolute -top-2 right-2 md:-top-3 md:right-3 w-16 h-20 md:w-20 md:h-24 text-white z-[3]"
        style={{ rotate: '-18deg' }}
        variants={{
          initial: { x: 0, y: 0, scale: 1 },
          hover: { x: 4, y: -4, scale: 1.1 },
        }}
        transition={{ duration: 0.3, ease: [0.39, 0.58, 0.57, 1] }}
      >
        <PartsSVG />
      </motion.span>

      {/* Content Container */}
      <div className="relative z-[2] flex flex-col items-center text-gray-800">
        {/* Bubble with "Next OC" text */}
        <div className="w-16 h-6 md:w-20 md:h-7 mb-1 grid" style={{ gridTemplateAreas: '"bubble"' }}>
          <span className="text-white" style={{ gridArea: 'bubble' }}>
            <BubbleSVG />
          </span>
          <span
            className="text-green-600 flex items-center justify-center text-[8px] md:text-[10px] font-bold"
            style={{ gridArea: 'bubble' }}
          >
            Next OC
          </span>
        </div>

        {/* Label */}
        <span className="text-sm md:text-base font-bold mb-0.5 tracking-tight">{label}</span>

        {/* Date */}
        <div className="flex items-baseline gap-1">
          <span className="text-3xl md:text-4xl lg:text-5xl font-black leading-none">{date}</span>
          <span className="w-5 h-5 md:w-6 md:h-6">
            <SaturdaySVG />
          </span>
        </div>

        {/* More Button */}
        <motion.span
          className="mt-2 px-3 py-1 md:px-4 md:py-1.5 border border-gray-800 rounded-full flex items-center gap-1.5 text-xs md:text-sm font-bold"
          variants={{
            initial: { backgroundColor: 'transparent' },
            hover: { backgroundColor: 'rgba(0,0,0,0.1)' },
          }}
          transition={{ duration: 0.3 }}
        >
          <span>{moreText}</span>
          <span className="w-3 h-3">
            <ExternalLinkSVG />
          </span>
        </motion.span>
      </div>

      {/* Lead Text - Bottom */}
      <motion.span
        className="absolute bottom-4 left-0 right-0 text-center text-[8px] md:text-[10px] text-gray-600 opacity-70 z-[2]"
        variants={{
          initial: { opacity: 0.7, rotate: 0 },
          hover: { opacity: 1, rotate: 0 },
        }}
        transition={{ duration: 0.5, delay: 0.3, ease: [0, 0.7, 0.32, 1.28] }}
      >
        اكتشف المزيد
      </motion.span>
    </Wrapper>
  );
}
