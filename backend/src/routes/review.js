import { getFirestore, collection, addDoc } from 'firebase/firestore';
async function postReview(userId, productId, rating, comment) {
  await addDoc(collection(getFirestore(), 'reviews'), {
    rating,
    comment: comment || null,
    review_date: new Date(),
    user_id: userId,
    product_id: productId
  });
}