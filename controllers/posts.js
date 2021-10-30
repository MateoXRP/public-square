const { Post } = require('../models/Post');
const { Comment } = require('../models/Comment');
const { Like } = require('../models/Like');
const { Tip } = require('../models/Tip');
const { User } = require('../models/User');

const { getUserId } = require('../controllers/users');
const { getAccountTxByMarker } = require('../services/xrpl-client');
const { findPostByTxHash } = require('../util/post');
const {
  getTimestamp,
  getTxAmountData,
  parseMemoData
} = require('../util/tx-data');

const getPostTransaction = async txHash => {
  let targetTx = null;
  let marker = null;

  try {
    while (!targetTx) {
      const response = await getAccountTxByMarker(20, marker);

      // look for post in tx batch
      const target = findPostByTxHash(response.transactions, txHash);

      // if found end loop
      if (target) {
        targetTx = target;
      }

      marker = response.marker;
    }

    return targetTx;
  } catch (error) {
    console.log(error);
    return error;
  }
};

const savePostToDB = async data => {
  const { Account, Amount, date, hash, Memos } = data;

  try {
    const user = await getUserId(Account);

    const postContent = parseMemoData(Memos);

    const amountData = getTxAmountData(Amount);

    const postData = {
      author: user,
      userAccount: Account,
      amount: amountData,
      date: getTimestamp(date),
      hash,
      content: postContent
    };

    // create new Post doc
    const newPost = new Post(postData);

    //  save post to DB
    const post = await newPost.save();

    // return post hash for response and client redirect
    return { postHash: post.hash };
  } catch (error) {
    console.log(error);
    return error;
  }
};

// fetch posts batch
const getPosts = async cursor => {
  try {
    const posts = await Post.find()
      .sort({ date: -1 })
      .skip(cursor)
      .limit(4)
      .populate({
        path: 'author'
      })
      .populate({
        path: 'comments',
        select: [
          'postId',
          'postHash',
          'user',
          'userAccount',
          'amount',
          'date',
          'hash',
          'content'
        ],
        populate: {
          path: 'comments.user'
        },
        populate: {
          path: 'comments.userAccount'
        }
      })
      .populate({
        path: 'likes',
        populate: {
          path: 'likes.postId'
        },
        populate: {
          path: 'likes.user'
        },
        populate: {
          path: 'likes.userAccount'
        }
      })
      .populate({
        path: 'tips',
        populate: {
          path: 'tips.postId'
        },
        populate: {
          path: 'tips.donor'
        },
        populate: {
          path: 'tips.donorAccount'
        },
        populate: {
          path: 'tips.recipient'
        },
        populate: {
          path: 'tips.recipientAccount'
        }
      });

    //console.log('posts: ', posts);

    return posts;
  } catch (error) {
    console.log(error);
    return error;
  }
};

// fetch post by postId
const getPostById = async postId => {
  try {
    const post = await Post.findById(postId)
      .populate({
        path: 'author'
      })
      .populate({
        path: 'comments',
        select: [
          'postId',
          'postHash',
          'user',
          'userAccount',
          'amount',
          'date',
          'hash',
          'content'
        ],
        populate: {
          path: 'comments.user'
        },
        populate: {
          path: 'comments.userAccount'
        }
      })
      .populate({
        path: 'likes',
        populate: {
          path: 'likes.postId'
        },
        populate: {
          path: 'likes.user'
        },
        populate: {
          path: 'likes.userAccount'
        }
      })
      .populate({
        path: 'tips',
        populate: {
          path: 'tips.postId'
        },
        populate: {
          path: 'tips.donor'
        },
        populate: {
          path: 'tips.donorAccount'
        },
        populate: {
          path: 'tips.recipient'
        },
        populate: {
          path: 'tips.recipientAccount'
        }
      });

    // console.log('post: ', post);

    return post;
  } catch (error) {
    console.log(error);
    return error;
  }
};

// fetch post by hash
const getPostByHash = async txHash => {
  try {
    const post = await Post.findOne({ hash: txHash })
      .populate({
        path: 'author'
      })
      .populate({
        path: 'comments',
        select: [
          'postId',
          'postHash',
          'user',
          'userAccount',
          'amount',
          'date',
          'hash',
          'content'
        ],
        populate: {
          path: 'comments.user'
        },
        populate: {
          path: 'comments.userAccount'
        }
      })
      .populate({
        path: 'likes',
        populate: {
          path: 'likes.postId'
        },
        populate: {
          path: 'likes.user'
        },
        populate: {
          path: 'likes.userAccount'
        }
      })
      .populate({
        path: 'tips',
        populate: {
          path: 'tips.postId'
        },
        populate: {
          path: 'tips.donor'
        },
        populate: {
          path: 'tips.donorAccount'
        },
        populate: {
          path: 'tips.recipient'
        },
        populate: {
          path: 'tips.recipientAccount'
        }
      });

    console.log('post: ', post);

    return post;
  } catch (error) {
    console.log(error);
    return error;
  }
};

// fetch posts batch
const getPostsByAccount = async (account, cursor) => {
  try {
    const user = await User.findOne({ account });

    const posts = await Post.find({ author: user._id })
      .sort({ date: -1 })
      .skip(cursor)
      .limit(4)
      .populate({
        path: 'author'
      })
      .populate({
        path: 'comments',
        select: [
          'postId',
          'postHash',
          'user',
          'userAccount',
          'amount',
          'date',
          'hash',
          'content'
        ],
        populate: {
          path: 'comments.user'
        },
        populate: {
          path: 'comments.userAccount'
        }
      })
      .populate({
        path: 'likes',
        populate: {
          path: 'likes.postId'
        },
        populate: {
          path: 'likes.user'
        },
        populate: {
          path: 'likes.userAccount'
        }
      })
      .populate({
        path: 'tips',
        populate: {
          path: 'tips.postId'
        },
        populate: {
          path: 'tips.donor'
        },
        populate: {
          path: 'tips.donorAccount'
        },
        populate: {
          path: 'tips.recipient'
        },
        populate: {
          path: 'tips.recipientAccount'
        }
      });

    // console.log('posts: ', posts);

    return posts;
  } catch (error) {
    console.log(error);
    return error;
  }
};

const getNextCursor = async cursor => {
  try {
    const postsLeft = await Post.find()
      .sort({ date: -1 })
      .skip(cursor)
      .countDocuments();

    return postsLeft > 0 ? cursor + 4 : null;
  } catch (error) {
    console.log(error);
    return error;
  }
};

const getAccountNextCursor = async (account, cursor) => {
  try {
    const user = await User.findOne({ account });
    const postsLeft = await Post.find({ author: user._id })
      .sort({ date: -1 })
      .skip(cursor)
      .countDocuments();

    return postsLeft > 0 ? cursor + 4 : null;
  } catch (error) {
    console.log(error);
    return error;
  }
};

module.exports = {
  getPostTransaction,
  savePostToDB,
  getPosts,
  getPostById,
  getPostByHash,
  getPostsByAccount,
  getNextCursor,
  getAccountNextCursor
};
