from common import *

def getPass(args):
    conn = Connection()
    if conn:
        try:
            #등록이력체크
            sql='''SELECT pass
            FROM house.`member`
            WHERE email="{email}"'''.format(
                email=args['email']
            )

            data = conn.executeAll(sql)

            #1건이상 있을 경우
            if len(data)>0:
                return [True,data[0]["pass"]]
                
        except UserError as e:
            return json.dumps({'status': False, 'message': e.msg}), 200
        except Exception as e:
            traceback.print_exc()
            return json.dumps({'message': '관리자에게 문의해주세요.'}), 400
        else:
            return [False]
        finally:
            conn.close()
