from common import *

def getMemberId(args):
    conn = Connection()
    if conn:
        try:
            #회원아이디취득
            sql = '''SELECT memberId
                FROM house.`member`
                WHERE id="{id}"'''.format(id=args['userId'])
            data = conn.executeAll(sql)
        except UserError as e:
            return json.dumps({'status': False, 'message': e.msg}), 200
        except Exception as e:
            traceback.print_exc()
            conn.rollback()
            raise e
        else:
            return data[0]['memberId']
        finally:
            conn.close()

def insertRoom(args):
    conn = Connection()
    if conn:
        try:
            #방등록
            sql='''INSERT INTO house.room
            ( houseType1, houseType2, post
            , city1, city2, city3
            , title, content, fileNm1
            , fileNm2, lat, lng
            , memberId, regDate)
            VALUES('{houseType1}', '{houseType2}', '{post}'
            , '{city1}', '{city2}', '{city3}'
            , '{title}', '{content}', '{fileNm1}'
            , '{fileNm2}', {lat}, {lng}
            , {memberId}, CURRENT_TIMESTAMP)'''.format(
                houseType1=args['houseType1']
                ,houseType2=args['houseType2']
                ,post=args['post']
                ,city1=args['city1']
                ,city2=args['city2']
                ,city3=args['city3']
                ,title=args['title']
                ,content=args['content']
                ,fileNm1=args['fileNm1']
                ,fileNm2=args['fileNm2']
                ,lat=args['lat']
                ,lng=args['lng']
                ,memberId=args['userId'])

            #raise UserError('사용자에러 테스트')
            conn.execute(sql)
        except UserError as e:
            return json.dumps({'status': False, 'message': e.msg}), 200
        except Exception as e:
            traceback.print_exc()
            conn.rollback()
            raise e
        else:
            conn.commit()
        finally:
            conn.close()

def chekRegRoomCnt(args):
    conn = Connection()
    if conn:
        try:
            #등록한 방갯수확인
            sql = '''SELECT count(*) as cnt
            FROM house.`member` as m
            JOIN house.`room` as r on m.memberId =r.memberId
            WHERE r.memberId="{id}"'''.format(id=args['userId']) 

            data = conn.executeAll(sql)
        except UserError as e:
            return json.dumps({'status': False, 'message': e.msg}), 200
        except Exception as e:
            traceback.print_exc()
            conn.rollback()
            raise e
        else:
            return data[0]['cnt']
        finally:
            conn.close()

def getRoom(args):
    conn = Connection()
    if conn:
        try:
            #방정보가져오기
            sql = '''SELECT roomId
            ,(select name from code where r.houseType1 = code) as houseType1
            ,(select name from code where r.houseType2 = code) as houseType2
            , post
            , city1
            , city2
            , city3
            , title
            , content
            , fileNm1
            , fileNm2
            , lat
            , lng
            , memberId
            , DATE_FORMAT(regDate, "%%Y-%%m-%%d") as regDate
            , adStatus
            FROM house.room as r
            WHERE memberId="{id}"
            '''.format(id=args['userId'])
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

