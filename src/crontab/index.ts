import { CronJob } from "cron";
import { env } from "~/helpers";

// second minute hour monthday month weekday
enum Period {
    DAILY = "0 0 0 * * *",
    HOURLY = "0 0 * * * *",
    HALF_HOURLY = "0 */30 * * * *",
    SIX_HOURLY = "0 0 */6 * * *",
    MONTHLY_17_EVERY_10_MINS = "0 */10 * 17 * *",
}

const startDodgyAudit = (job: CronJob) => {
    const done = true;

    if (done) {
        job.stop();
    }
};

if (!env.DEV) {
    console.log("Starting CRON");

    const job = new CronJob(
        Period.MONTHLY_17_EVERY_10_MINS,
        () => startDodgyAudit(job),
        null,
        true,
    );
}
