-- CreateTable
CREATE TABLE "Users" (
    "username" TEXT NOT NULL,
    "nickname" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "profilePicture" JSONB NOT NULL,
    "banner" JSONB NOT NULL,
    "description" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Users_pkey" PRIMARY KEY ("username")
);

-- CreateTable
CREATE TABLE "UsersFollows" (
    "followerUserId" TEXT NOT NULL,
    "followingUserId" TEXT NOT NULL,

    CONSTRAINT "UsersFollows_pkey" PRIMARY KEY ("followerUserId","followingUserId")
);

-- CreateTable
CREATE TABLE "Posts" (
    "id" SERIAL NOT NULL,
    "media" JSONB,
    "title" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Posts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PostsUsersOptions" (
    "id" SERIAL NOT NULL,
    "userId" TEXT NOT NULL,
    "postId" INTEGER NOT NULL,
    "liked" BOOLEAN NOT NULL DEFAULT false,
    "favorited" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "PostsUsersOptions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PostsComments" (
    "id" SERIAL NOT NULL,
    "postUserOptionsId" INTEGER NOT NULL,
    "comment" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PostsComments_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Users_email_key" ON "Users"("email");

-- CreateIndex
CREATE INDEX "Users_username_nickname_email_idx" ON "Users"("username", "nickname", "email");

-- CreateIndex
CREATE INDEX "UsersFollows_followerUserId_followingUserId_idx" ON "UsersFollows"("followerUserId", "followingUserId");

-- CreateIndex
CREATE INDEX "Posts_id_title_idx" ON "Posts"("id", "title");

-- CreateIndex
CREATE INDEX "PostsUsersOptions_id_userId_postId_favorited_idx" ON "PostsUsersOptions"("id", "userId", "postId", "favorited");

-- CreateIndex
CREATE INDEX "PostsComments_id_postUserOptionsId_comment_idx" ON "PostsComments"("id", "postUserOptionsId", "comment");

-- AddForeignKey
ALTER TABLE "UsersFollows" ADD CONSTRAINT "UsersFollows_followerUserId_fkey" FOREIGN KEY ("followerUserId") REFERENCES "Users"("username") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UsersFollows" ADD CONSTRAINT "UsersFollows_followingUserId_fkey" FOREIGN KEY ("followingUserId") REFERENCES "Users"("username") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Posts" ADD CONSTRAINT "Posts_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("username") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PostsUsersOptions" ADD CONSTRAINT "PostsUsersOptions_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("username") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PostsUsersOptions" ADD CONSTRAINT "PostsUsersOptions_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Posts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PostsComments" ADD CONSTRAINT "PostsComments_postUserOptionsId_fkey" FOREIGN KEY ("postUserOptionsId") REFERENCES "PostsUsersOptions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
