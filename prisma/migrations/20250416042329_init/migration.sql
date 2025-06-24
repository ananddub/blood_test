-- CreateTable
CREATE TABLE "JWT" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "jwt" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "JWT_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "JWT_userId_key" ON "JWT"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "JWT_jwt_key" ON "JWT"("jwt");

-- AddForeignKey
ALTER TABLE "JWT" ADD CONSTRAINT "JWT_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
