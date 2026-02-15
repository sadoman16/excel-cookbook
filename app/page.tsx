import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";

export default function Home() {
  return (
    <div className="space-y-8">
      <section className="space-y-4 pt-6 md:pt-10 lg:pt-16">
        <div className="flex flex-col items-center gap-4 text-center">
          <div className="inline-block rounded-lg bg-slate-100 px-3 py-1 text-sm text-excel-green dark:bg-slate-800">
            Excel Cookbook (Beta)
          </div>
          <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl md:text-6xl text-slate-900 dark:text-slate-50">
            엑셀 오류, <span className="text-excel-green">요리책</span>처럼 찾으세요.
          </h1>
          <p className="max-w-[700px] text-slate-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-slate-400">
            "VLOOKUP이 뭐지?"라고 묻지 마세요.<br />
            "두 시트 비교해서 없는 값 찾기" 처럼 <strong>문제 해결 레시피</strong>를 복사해가세요.
          </p>
          <div className="flex gap-4">
            <Button size="lg">레시피 검색하기</Button>
            <Button size="lg" variant="outline">인기 레시피 보기</Button>
          </div>
        </div>
      </section>

      <section className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>🍳 VLOOKUP #N/A 해결</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              값은 있는데 왜 못 찾을까요? 공백 제거(TRIM)와 자료형 일치(VALUE)로 3초 만에 해결하는 법.
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>🍱 두 시트 비교하기</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              VLOOKUP과 IF를 섞어서 A시트엔 있고 B시트엔 없는 명단을 추출하는 완벽한 공식.
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>🥗 IF 다중조건 정리</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              IF 안에 IF 그만 넣으세요. IFS 함수나 LOOKUP으로 깔끔하게 정리하는 비법.
            </p>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
