import Transaction from '../models/transaction.model.js';
import Flag from '../models/flag.model.js';

export const runFraudCheck = async ({ user, transaction, type }) => {
  const userId = user._id;

  //Detect 7+ transfers in 1 minute
  if (type === 'transfer') {
    const oneMinuteAgo = new Date(Date.now() - 60 * 1000);

    const transferCount = await Transaction.countDocuments({
      sender: userId,
      type: 'transfer',
      timestamp: { $gte: oneMinuteAgo }
    });

    if (transferCount >= 7) {
      await Flag.create({
        user: userId,
        transaction: transaction._id,
        type: 'high-frequency-transfer',
        message: `🚨 ${transferCount} transfers in 1 minute`
      });

      console.log(`📧 [FRAUD ALERT] User ${user.email} made ${transferCount} transfers in 60 seconds.`);
    }
  }

  // Single transaction ≥ ₹10,000,000
  if (transaction.amount >= 10_000_000) {
    await Flag.create({
      user: userId,
      transaction: transaction._id,
      type: 'Big-amount',
      message: `🚨 Transaction fraud: ₹${transaction.amount}`
    });

    console.log(`📧 [FRAUD ALERT] User ${user.email} sent ₹${transaction.amount}`);
  }
};
