import { formatTime } from '../../utils/formatters.js';

export default function ProgressBar({
    value,
    currentTime,
    timeLeft,
    min = "0",
    max = "100",
    step ="0.1",
    onChange,
    className = "",
}) {
    return (
        <div className='space-y-1'>
            <input
                type="range"
                min={min}
                max={max}
                step={step}
                value={value}
                onChange={onChange}
                className={className}
            />
            <div className='flex justify-between'>
                <p className='text-sm'>{formatTime(currentTime)}</p>
                <p className='text-sm'>{formatTime(timeLeft)}</p>
            </div>
        </div>
    )
}
