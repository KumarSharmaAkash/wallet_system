import cron from 'node-cron';
import Transaction from '../models/transaction.model.js';
import Flag from '../models/flag.model.js';

const ONE_DAY_MS = 24 * 60 * 60 * 1000;
const THRESHOLD_AMOUNT = 10_000_000;

const scanTransactions = async () => {
  try {
    const recentTxns = await Transaction.find({
      timestamp: { $gte: new Date(Date.now() - ONE_DAY_MS) }
    });

    for (const txn of recentTxns) {
      if (txn.amount >= THRESHOLD_AMOUNT) {
        await Flag.create({
          user: txn.sender,
          transaction: txn._id,
          type: 'daily-scan-Big-amount',
          message: `Big Amount flagged: ₹${txn.amount}`
        });

        // mocked email notification
        console.log(`ALERT: Flagged user ${txn.sender} for ₹${txn.amount} transaction`);
      }
    }

    console.log('Daily fraud scan finished');
  } catch (error) {
    console.error('Daily fraud scan failed:', error.message);
  }
};

const scheduleDailyFraudScan = () => {
  cron.schedule('0 0 * * *', scanTransactions);
  console.log('fraud scan scheduled Daily !!!!!!');
};

export default scheduleDailyFraudScan;
