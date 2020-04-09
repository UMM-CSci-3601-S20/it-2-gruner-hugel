REM @ECHO OFF
REM echo Dropping DB dev
REM mongo dev --eval "db.dropDatabase()"
REM for %%f in (seed\*.json) do (
REM   echo Seeding %%~nf from %%f in DB dev
REM   mongoimport --db=dev --collection=%%~nf --file=%%f --jsonArray
REM )
