from common import *


def getRooms():
    conn = Connection()
    if conn:
        try:
            #방정보가져오기
            sql = '''SELECT roomId
            ,(select name from code where r.houseType1 = code) as houseType1
            ,(select name from code where r.houseType2 = code) as houseType2
            , title
            , content
            , fileNm1
            , memberId
            , DATE_FORMAT(regDate, "%%Y-%%m-%%d") as regDate
            , adStatus
            FROM house.room as r
            WHERE adStatus=1
            ORDER BY regDate DESC
            LIMIT 4
            '''

            data = conn.executeAll(sql)
        except UserError as e:
            return json.dumps({'status': False, 'message': e.msg}), 200
        except Exception as e:
            traceback.print_exc()
            conn.rollback()
            raise e
        else:
            return data
        finally:
            conn.close()

def getInputRooms(args):
    conn = Connection()
    if conn:
        try:
            #방정보가져오기
            sql = '''SELECT
                roomId,
                houseType1,
                houseType2,
                post,
                city1,
                city2,
                city3,
                title,
                content,
                memberId,
                regDate,
                adStatus
            FROM
                house.room
            WHERE
                city1 LIKE "%%{city1}%%"
                OR city2 LIKE "%%{city2}%%"
                OR city3 LIKE "%%{city3}%%"
                OR title LIKE "%%{title}%%"
                OR content LIKE "%%{content}%%"
                AND adStatus=1
            '''.format(
                city1=args['inputValue']
                ,city2=args['inputValue']
                ,city3=args['inputValue']
                ,title=args['inputValue']
                ,content=args['inputValue'])

            data = conn.executeAll(sql)
        except UserError as e:
            return json.dumps({'status': False, 'message': e.msg}), 200
        except Exception as e:
            traceback.print_exc()
            conn.rollback()
            raise e
        else:
            return data
        finally:
            conn.close()
