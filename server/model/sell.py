from common import *

def insertRoom(args):
    conn = Connection()
    if conn:
        try:
            reMsg = '会員登録しました。\nログインしてください。'# return Msg

            #회원등록
            sql='''INSERT INTO house.`member`
            (id,email,pass, regDate)
            VALUES("{id}","{email}", "{passWd}", CURRENT_TIMESTAMP)'''.format(
                id=args['id']
                ,email=args['email']
                ,passWd=args['pass'])

            #raise UserError('사용자에러 테스트')
            data = conn.execute(sql)
        except UserError as e:
            return json.dumps({'status': False, 'message': e.msg}), 200
        except Exception as e:
            traceback.print_exc()
            conn.rollback()
            raise e
        else:
            conn.commit()
            return json.dumps({'status': True, 'message': reMsg}), 200
        finally:
            conn.close()

