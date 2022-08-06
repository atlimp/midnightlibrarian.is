<script lang='ts'>
    import type { DateOfInterest } from "$lib/interfaces";

    export let data: DateOfInterest;
    let time: string = '';
    let date: string = '';
    let message: string = '';

    const padZero = (val) => {
        if (val < 10) {
            return "0" + val;
        } else {
            return val + "";
        }
    }

    const setDateAndTime = async () => {
        time = data.date.toLocaleString("default", { hour12: true, hour: "2-digit", minute: "2-digit" });
        date = data.date.toLocaleString("default", { month: "short", day: "2-digit", year: "numeric" });
    }

    const setCountdownValue = async () => {
        let distance = data.date.getTime() - new Date().getTime();

        if (distance < 0) {
            time = 'NOW'
            date = '';
            return;
        }
        
        const days = Math.floor(distance / (1000 * 60 * 60 * 24))
        const hours = Math.floor(distance % (1000 * 60 * 60 * 24) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        let timestring = '';

        if (days > 1)
            timestring = `${days} days ${padZero(hours)}:${padZero(minutes)}:${padZero(seconds)}`;
        else if (days === 1)
            timestring = `${days} day ${padZero(hours)}:${padZero(minutes)}:${padZero(seconds)}`;
        else
            timestring = `${padZero(hours)}:${padZero(minutes)}:${padZero(seconds)}`;

        time = timestring;
        date = '';
    }
    if (data.countdown) {
        setCountdownValue();
        setInterval(() => {
            setCountdownValue();
        }, 1000);
    } else {
        setDateAndTime();
    }
</script>
<div class="flex flex-col text-right">
    <span class="text-xl">{data.message}</span>
    <span class="text-2xl leading-6 md:text-4xl">{time}</span>
    <span class="text-2xl leading-6 md:text-4xl">{date}</span>
</div>