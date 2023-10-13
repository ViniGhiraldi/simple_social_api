-- DropForeignKey
ALTER TABLE "Posts" DROP CONSTRAINT "Posts_userId_fkey";

-- DropForeignKey
ALTER TABLE "PostsComments" DROP CONSTRAINT "PostsComments_postId_fkey";

-- DropForeignKey
ALTER TABLE "PostsComments" DROP CONSTRAINT "PostsComments_userId_fkey";

-- DropForeignKey
ALTER TABLE "PostsUsersOptions" DROP CONSTRAINT "PostsUsersOptions_postId_fkey";

-- DropForeignKey
ALTER TABLE "PostsUsersOptions" DROP CONSTRAINT "PostsUsersOptions_userId_fkey";

-- DropForeignKey
ALTER TABLE "UsersFollows" DROP CONSTRAINT "UsersFollows_followedUserId_fkey";

-- DropForeignKey
ALTER TABLE "UsersFollows" DROP CONSTRAINT "UsersFollows_followerUserId_fkey";

-- AddForeignKey
ALTER TABLE "UsersFollows" ADD CONSTRAINT "UsersFollows_followerUserId_fkey" FOREIGN KEY ("followerUserId") REFERENCES "Users"("username") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UsersFollows" ADD CONSTRAINT "UsersFollows_followedUserId_fkey" FOREIGN KEY ("followedUserId") REFERENCES "Users"("username") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Posts" ADD CONSTRAINT "Posts_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("username") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PostsUsersOptions" ADD CONSTRAINT "PostsUsersOptions_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("username") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PostsUsersOptions" ADD CONSTRAINT "PostsUsersOptions_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Posts"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PostsComments" ADD CONSTRAINT "PostsComments_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("username") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PostsComments" ADD CONSTRAINT "PostsComments_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Posts"("id") ON DELETE CASCADE ON UPDATE CASCADE;
